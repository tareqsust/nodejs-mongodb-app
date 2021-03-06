var _ = require('merger');  //  lets do: _.extend(same,otherobjexts),  _.clone(obj) - creates new reference, see source to understand // 


function before(app)
{
 //modify self and others
} this.before=before;

function add_model(app)
{
 app.database.name='webappdb';

 app.models.mainpage               = _.clone(  app.basicmodel );
 app.models.mainpage.general.name  = 'mainpage';
 app.models.mainpage.fields.id     = _.extend( app.basicfields.id,{} );
 app.models.mainpage.fields.title  = _.extend( _.clone(app.basicfields.normal),{general:{title:'Title'}} );
 app.models.mainpage.fields.text   = _.extend( _.clone(app.basicfields.normal),{general:{title:'Text on Main Page'},edit:{ftype:'dhtml'}} );
 app.models.mainpage.fields.footer = _.extend( _.clone(app.basicfields.normal),{general:{title:'Footer of the website'},edit:{ftype:'dhtml'}} );
 
} this.add_model=add_model;

function add_pages_and_urls(app)
{
 
// app.urls.push(['data/main',page,'main']);
 
} this.add_pages_and_urls=add_pages_and_urls;

function add(app) // exported constructor
{
  add_model(app);
} this.add=add;

function after(app)
{
  add_pages_and_urls(app);
 //verify self and others
} this.after=after;
