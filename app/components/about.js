/** @jsx React.DOM */

var React = require('react/addons');
var $ = require('jquery');
var Router = require('react-router');

var About = React.createClass({

      mixins: [Router.State],

      render: function () {
        return (
        <div className="container">
          <div id="about">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">What is SPLTS?</h3>
              </div>
              <div className="panel-body">
                SPLTS is a way for coaches to track their athletes&apos; times without the use of a clipboard and a traditonal stopwatch. 
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">What does the SPLTS website do?</h3>
              </div>
              <div className="panel-body">
                This website is used to a dashboard to view your athletes&apos; progress and manage your team. The times will be collected via the SPLTS mobile app for the iPhone.  
                If you have not yet downloaded the SPLTS app for the iPhone, stop reading and do that now.
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">What does the SPLTS app do?</h3>
              </div>
              <div className="panel-body">
                The SPLTS app for the iPhone is a replacement for your stopwatch and clipboard. Once you login into the app, you can create a new workout, add runners to that workout, and then time all of your athletes at once.
                Once the workout has finished, click Save and those times will be saved to a database and viewable on this website.
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Ok, so I downloaded the app and created a workout, but I do not have any runners to select. What should I do?</h3>
              </div>
              <div className="panel-body">
                Login to the SPLTS website. Go to your profile page. Under the <b>Athletes</b> tab, find the <b>Create New Athlete</b> tool. Here, you will enter the first and last name of the athlete you want to add to your list. Click <b>Save</b>.
                That athlete should now appear in the list. 
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">I want my athlete to be able to view his/her profile. How do I do that?</h3>
              </div>
              <div className="panel-body">
                First, use the Create New Athlete tool (as described above) to add the athlete to your list. Then, you can tell your athlete to visit this website and sign up. <b>IMPORTANT!</b> On the Sign Up page, the 
                athlete must enter the first and last name exactly as you have typed it when using the Create New Athlete tool, or else the profile link cannot be completed. The athlete will <b>not</b> be able to create a profile
                until you add them to the list via the Create New Athlete tool.
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">I need some technical support. Who do I contact?</h3>
              </div>
              <div className="panel-body">
                Send an email to <b>colin_cole@icloud.com</b> with a detailed description of the problem you are having.
              </div>
            </div>
          </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = About;