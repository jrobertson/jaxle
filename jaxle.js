// file: jaxle.js

function jaxle(url) {

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

  var a = [];

  // code for IE
  if (window.ActiveXObject) {
    var nodes=this.selectNodes(path);
     
    for (i = 0; i < nodes.length; i++) {
      a[i] = nodes[i];
    }
  }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {

    var nodes=document.evaluate(path, this, null, XPathResult.ANY_TYPE, null);
    var result=nodes.iterateNext();
    var j = 0;     

    while (result) {
      a[j] = result;
      j++;
      result=nodes.iterateNext();
    }
  }

  return a;
}

function element(path){return this.xpath(path)[0];}
function text(){return this.firstChild.nodeValue;}

Document.prototype.xpath = xpath;
Element.prototype.xpath = xpath;
Document.prototype.element = element;
Element.prototype.element = element;
Document.prototype.text = text;
Element.prototype.text = text;


