import React, { Component } from 'react';

class Pagenav extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className="page-nav bg-lightblue pt-lg--7 pb-lg--7 pb-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="text-grey-800 fw-700 display3-size">
                {title}
                <span className="font-xsss text-grey-600 fw-600 d-block mt-2">
                  Inicio / {subtitle}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagenav;
