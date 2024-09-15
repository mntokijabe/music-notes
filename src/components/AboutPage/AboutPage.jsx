import React from 'react';



function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Music Notes is an app for choir directors and students. </p>
        <p>Students are able to see which songs each choral group is currently 
          working on and can also search the school's music database.
          Both students and teachers can view the Choral Calendar for upcoming events.</p>
        <p>Directors additionally have admin rights and can also add and edit songs, 
          modify ensemble information, and also keep notes about songs the groups 
          have performed.
        </p>
      </div>
      <p>The making of Music Notes utilized the following technologies along with Javascript:</p>
        <ul>React</ul>
        <ul>Node.js</ul>
        <ul>Redux, Sagas</ul>
        <ul>PostgreSql</ul>
        <ul>Material UI</ul>


    </div>
  );
}

export default AboutPage;
