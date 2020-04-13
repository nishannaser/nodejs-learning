const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

/* ================================================================================================== */

// Connection
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

// Schema
// ======
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const listsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [itemsSchema]
});

// Model
// =====
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listsSchema);

/* ================================================================================================== */

// Default documents
const item1 = new Item({
  name: "Welcome to your todo list!"
});
const item2 = new Item({
  name: "Use the + button to add new items"
});
const item3 = new Item({
  name: "<--- Click here to delete an item"
});

const defaultItems = [item1, item2, item3];

/* ================================================================================================== */

// Root GET (Today List)
app.get("/", function (req, res) {

  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log("Error.. unable to find default items");
    } else {

      if (foundItems.length === 0) {
        // Insert the default items if array is empty
        Item.insertMany(defaultItems, (err) => {
          if (!err) {
            console.log("Successfully inserted the default items!");
          }
        });
        res.redirect("/");

      } else {
        // Show the page with the found items list
        res.render("list", {
          listName: "Today",
          listItems: foundItems
        });
      }
    }
  });

});


// Root POST (Add item to any list)
app.post("/", function (req, res) {
  const listName = req.body.list;
  const newItemName = req.body.newItem;
  const newItem = new Item({
    name: newItemName
  });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, (err, foundList) => {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

// Create/Get Custom Lists
app.get("/:listName", (req, res) => {
  const customListName = _.capitalize(req.params.listName);

  List.findOne({
    name: customListName
  }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const customList = new List({
          name: customListName,
          items: defaultItems
        });

        List.insertMany(customList, (err) => {
          if (!err) {
            console.log("Successfully initialized the custom list: " + customListName);
          }
        });

        res.redirect("/" + customListName);

      } else {
        // Show the page with the found items list
        res.render("list", {
          listName: customListName,
          listItems: foundList.items
        });
      }
    }
  });

});

// Delete item from any list
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkedItem;
  const listName = req.body.list;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log("Successfully deleted checked item");
      }
    });
    res.redirect("/");

  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, (err, foundList) => {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }


});

/* ================================================================================================== */

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on port " + port);
});