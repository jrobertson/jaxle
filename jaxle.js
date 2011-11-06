// file: jaxle.js

// requires jfr.js

Jaxle = {new: loadXMLDoc};

function loadXMLDoc(url) {

  if (window.XMLHttpRequest)
    xhttp=new XMLHttpRequest();
  else
    xhttp=new ActiveXObject("Microsoft.XMLHTTP");

  xhttp.open("GET",url,false);
  xhttp.send("");
  return xhttp.responseXML;
}

function xpath(path){

  var a = rb.Array.new();

  // code for IE
  if (window.ActiveXObject) {
    a = new rb.Array(this.selectNodes(path));
  }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {

    var nodes=document.evaluate(path, this, null, XPathResult.ANY_TYPE, null);
    var result=nodes.iterateNext();
    var j = 0;     

    while (result) {
      a.set(j, result);
      j++;
      result=nodes.iterateNext();
    }
  }

  return a;
}

function element(path){
  a = this.xpath(path);
  return (a.length() > 0) ? a.first() : nil;
}
function text(){
  return rb.String.new(this.firstChild ? this.firstChild.nodeValue : '');
}
function attribute(attr){
  var r = this.getAttribute(attr)
  return r ? rb.String.new(r) : nil;
}
function clone(){return this.cloneNode(false);}
function deep_clone(){return this.cloneNode(true);}
function elements(){return rb.Array.new(this.childNodes).select(function(x){
  return x.nodeType == 1; }); 
}
function name(){return rb.String.new(this.nodeName); }
function deleteElement(xpath){
  (typeof xpath == 'undefined') ? this.parentNode.removeChild(this) :
    this.element(xpath).delete();      
}
function append_child(child){ return this.appendChild(child); }
function parent(){ return this.parentNode; }

Document.prototype.xpath = xpath;
Element.prototype.xpath = xpath;
Document.prototype.element = element;
Element.prototype.element = element;
Document.prototype.text = text;
Element.prototype.text = text;
Document.prototype.attribute = attribute;
Element.prototype.attribute = attribute;
Document.prototype.clone = clone;
Element.prototype.clone = clone;
Document.prototype.deep_clone = deep_clone;
Element.prototype.deep_clone = deep_clone;
Document.prototype.elements =  elements; 
Element.prototype.elements =  elements; 
Document.prototype.name = name;
Element.prototype.name = name;
Element.prototype.delete = deleteElement;
Document.prototype.append = append_child;
Element.prototype.append = append_child;
Element.prototype.parent = parent;