// file: jaxle.js

// requires jfr.js


function Jaxle(url) {

  //read the file from the url
  xml = loadXMLDoc(url); 
  this.root = xml;

}

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

  var a = new rb.Array;

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

function element(path){return this.xpath(path).get(1);}
function text(){return this.firstChild.nodeValue;}
function attribute(attr){return new rb.String(this.getAttribute(attr));}
function clone(){return this.cloneNode(false);}
function deep_clone(){return this.cloneNode(true);}
function elements(){return new rb.Array(this.childNodes); }
function name(){return new rb.String(this.nodeName); }

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
