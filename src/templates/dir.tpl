<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body {
      background: antiquewhite;
    }
    #root {
      margin: 80px;
    }
    #root .link-wrapper {
      padding: 5px;
    }
    #root a {
      text-decoration: none;
      color: #555;
    }
  </style>
</head>
<body>
  <div id="root">
    {{#each files}}
    <div class="link-wrapper">
      <a href="{{../dir}}/{{this}}">{{this}}</a>
    </div>
    {{/each}}
  </div>
</body>
</html>
