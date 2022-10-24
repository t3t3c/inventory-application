1. `$ npm install --save multer`
2. enctype="multipart/form-data" is important

```html
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

```html
<!-- take a look at enctype -->
<form action="/stats" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <!-- name="uploaded_file" -->
    <input type="file" class="form-control-file" name="uploaded_file" />
    <input
      type="text"
      class="form-control"
      placeholder="Number of speakers"
      name="nspeakers"
    />
    <input type="submit" value="Get me the stats!" class="btn btn-default" />
  </div>
</form>
```

```js
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });
app.post('/stats', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
});
```
