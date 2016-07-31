# XSDT.js

*Extra Small DOM Transversal - Less than 1500 bytes minified!*

## Usage

While `XSDT` works in tandem with [XTF.js](https://gist.github.com/METACEO/df988bf134e3fdb18e8cafe9f6e4b7de) (originally forked from [XT.js](https://gist.github.com/plugnburn/07c383da5f151a54d0b2) by [plugnburn](https://github.com/plugnburn)...) you'll find this cursor handy with your other templating or DOM generator. This method navigates around the DOM in a strict manner. When you chain together methods and your chain modifies your DOM (say with `.call()`...) the rest of the chain should be prepared to handle or expect those modifications, otherwise you'll suffer unexpected results.

### Browser

Below is a *very* simple example. Note the two lines, if you provide a string, then `XSDT` will assume it as an element ID and will try to obtain it. If you do not provide any variable then `XSDT` will begin it's cursor with `window.document`. You can pass `XSDT` a document [element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or a document [fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) and its cursor will begin there.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <script src="xsdt.min.js"></script>
  </head>
  <body>
    
    <div id="myDiv">Hello world!</div>
    
    <script>
      
      XSDT().$ === window.document // true
      
      XSDT("myDiv").first().$ // #text "Hello world!"
      
      XSDT(document.getElementById("myDiv")).first().$ // #text "Hello world!"
      
    </script>
    
  </body>
</html>
```

### API

Below are the methods your `XSDT` instance provides you.

- `.call(func1,func2,...)` will iterate over provided arguments and execute function types, passing the cursor's current element.
  
  ```html
  <div id="someDiv"></div>
  
  <script>
    
    function modify($){ $.count = 1 }
    
    function increase($){ $.count++ }
    
    XSDT("someDiv").call(modify,increase)
    
    XSDT("someDiv").$.count === 2 // true
    
  </script>
  ```
  
- `.parent(levels)` will climb the cursor up levels of parent nodes.
  
  ```html
  <div class="top">
    <div class="sub">
      <div class="low">
        <div id="start"></div>
      </div>
    </div>
  </div>
  
  <script>
    
    XSDT("start").parent().$ // <div.low>
    
    XSDT("start").parent().parent().$ // <div.sub>
    
    XSDT("start").parent(3).$ // <div.top>
    
    XSDT("start").parent().parent(2).$ // <div.top>
    
  </script>
  ```
  
- `.child(index)` will move the cursor down to the child node of the specified index.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").child(0).$ // <a>
    
    XSDT("container").child(1).$ // <b>
    
    XSDT("container").child(2).$ // <c>
    
  </script>
  ```
  
- `.first(levels)` will move the cursor down to the first child node for level specified times.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").first().$ // <a>
    
  </script>
  ```
  
- `.last(levels)` will move the cursor down to the last child node for level specified times.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").last().$ // <c>
    
  </script>
  ```
  
- `.next(steps)` will move the cursor forward in the sibling order. Specified steps will determine how many siblings to move forward by. If the current element is the last sibling, then the cursor will cycle to the first sibling in order.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").first().next().$ // <b>
    
    XSDT("container").last().next().$ // <a>
    
  </script>
  ```
  
- `.previous(steps)` will move the cursor backward in the sibling order. Specified steps will determine how many siblings to move backward by. If the current element is the first sibling, then the cursor will cycle to the last sibling in order.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").first().previous().$ // <c>
    
    XSDT("container").last().previous().$ // <b>
    
  </script>
  ```
  
- `.start(offset)` will move the cursor to the beginning of the sibling order, offset by the specified amount. If the offset is greater than the sibling count, then the cursor will move to the last element.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").child(1).$ // <b>
    
    XSDT("container").child(1).start().$ // <a>
    
    XSDT("container").child(1).start(1).$ // <b>
    
    XSDT("container").child(1).start(10).$ // <c>
    
  </script>
  ```
  
- `.end(offset)` will move the cursor to the end of the sibling order, offset by the specified amount. If the offset is greater than the sibling count, then the cursor will move to the first element.
  
  ```html
  <div id="container"><a></a><b></b><c></c></div>
  
  <script>
    
    XSDT("container").child(1).$ // <b>
    
    XSDT("container").child(1).end().$ // <c>
    
    XSDT("container").child(1).end(1).$ // <b>
    
    XSDT("container").child(1).end(10).$ // <a>
    
  </script>
  ```
  
### Shorthands

These methods come with both the standard and minified code and can be dropped in without issue.

- `.call(...)` === `.c(...)`
- `.parent(...)` === `.up(...)`
- `.child(...)` === `.x(...)`
- `.first(...)` === `.f(...)`
- `.last(...)` === `.l(...)`
- `.next(...)` === `.n(...)`
- `.previous(...)` === `.p(...)`
- `.start(...)` === `.s(...)`
- `.end(...)` === `.e(...)`

Should you want to customize your own shorthands, modify the code in either the standard or the minified like so `__define("call c",function(){...})` to `__define("exe",function(){...})` or whatever else. Separate method names with spaces and be warry of specifying a name already in use by another method!
