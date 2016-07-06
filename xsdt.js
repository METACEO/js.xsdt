
(function(){
  
  var $document = window.document
  
  function integer(number,n){
    
    n = typeof n === "number" ? n : 1
    
    return typeof number === "number" && number > n ? Math.floor(number) : n
    
  }
  
  function XSDT(element){
    
    if(!(this instanceof XSDT)) return new XSDT(element);
    
    this.$ = typeof element === "string" ? document.getElementById(element) || $document : element || $document
    
    return this
    
  }
  
  function __define(key,value,index){
    
    key = key.split(" ")
    
    for(
      index = 0;
      index < key.length;
      index++
    ){
      
      XSDT.prototype[key[index]] = value
      
    }
    
  }
  
  __define("call c",function(){
    
    for(
      var index = 0;
      index < arguments.length;
      index++
    ){
      
      if(typeof arguments[index] === "function") arguments[index](this.$)
      
    }
    
    return this
    
  })
  
  __define("parent up",function(levels){
    
    for(
      levels = integer(levels);
      levels > 0 && this.$ !== $document && this.$.parentNode !== null;
      levels--
    ){
      
      this.$ = this.$.parentNode
      
    }
    
    return this
    
  })
  
  __define("child x",function(index){
    
    if(this.$.childNodes.length > index) this.$ = this.$.childNodes[index];
    
    return this
    
  })
  
  __define("first f",function(levels){
    
    for(
      levels = integer(levels);
      levels > 0 && this.$.childNodes.length > 0;
      levels--
    ){
      
      this.$ = this.$.childNodes[0]
      
    }
    
    return this
    
  })
  
  __define("last l",function(levels){
    
    for(
      levels = integer(levels);
      levels > 0 && this.$.childNodes.length > 0;
      levels--
    ){
      
      this.$ = this.$.childNodes[this.$.childNodes.length - 1]
      
    }
    
    return this
    
  })
  
  __define("next n",function(steps){
    
    for(
      steps = integer(steps);
      steps > 0 && this.$ !== $document;
      steps--
    ){
      
      this.$ = this.$.nextSibling === null ? this.$.parentNode.childNodes[0] : this.$.nextSibling
      
    }
    
    return this
    
  })
  
  __define("previous p",function(steps){
    
    for(
      steps = integer(steps);
      steps > 0 && this.$ !== $document;
      steps--
    ){
      
      this.$ = this.$.previousSibling === null ? this.$.parentNode.childNodes[this.$.parentNode.childNodes.length - 1] : this.$.previousSibling
      
    }
    
    return this
    
  })
  
  __define("start s",function(offset,children){
    
    if(
      this.$ !== $document
      &&
      (children = this.$.parentNode.childNodes)
      &&
      children.length > 1
    ){
      
      offset = integer(offset,0)
      
      this.$ = children.length > offset ? children[offset] : children[children.length - 1]
      
    }
    
    return this
    
  })
  
  __define("end e",function(offset,children){
    
    if(
      this.$ !== $document
      &&
      (children = this.$.parentNode.childNodes)
      &&
      children.length > 1
    ){
      
      offset = children.length - 1 - integer(offset,0)
      
      this.$ = offset < 0 ? children[0] : children[offset]
      
    }
    
    return this
    
  })
  
  window.XSDT = XSDT
  
})()

