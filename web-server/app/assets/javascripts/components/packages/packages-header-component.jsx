define(function(require) {
  var React = require('react'),
      PackageStore = require('../../stores/packages'),
      AddPackageComponent = require('./add-package-component');

  var PackagesHeaderComponent = React.createClass({
    render: function() {
      return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>
              Packages
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <p>
            </p>
          </div>
        </div>
        <AddPackageComponent PackageStore={PackageStore}/>
      </div>
    );}
  });

  return PackagesHeaderComponent;

});
