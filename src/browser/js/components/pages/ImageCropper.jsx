import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';

export default class Test extends React.Component {
  static defaultProps = {
    file: null,
    crop: {
      aspect: 1,
    },
    pixelCrop: null,
    cropping: false,
    croppedImg: null,
  }

  state = {
    file: null,
    crop: {
      aspect: 1,
    },
    pixelCrop: null,
    cropping: false,
    croppedImg: null,
  };

  handleFileUpload = e => {
    const { files } = e.target;
    const file = files[0];
    this.setState({ file });
  }

  onCropChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  }

  cropFile = () => {
    const{ file, pixelCrop } = this.state;
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    // console.log('image:::', image);
    const fileName = new Date().getTime();
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    });
  }

  applyCrop = () => {
    this.setState({ cropping: true });
    this.cropFile()
      .then(file => {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        console.log('image:::', image);
        this.setState({ cropping: false, croppedImg: file });
      });
  }

  render() {
    const { file, crop, cropping, croppedImg } = this.state;
    return (
      <div id="page" className="image-cropper-wrap">
        <div className="head-main"><h2>Image Cropper</h2></div>
        <div className="img-wrap d-flex justify-content-center align-items-center">
          {file && cropping === false && croppedImg === null &&
            <div className="cropper-wrap text-center">
              <ReactCrop src={URL.createObjectURL(file)} crop={crop} onChange={this.onCropChange} />
            </div>
          }
          {!file && cropping === false && croppedImg === null &&
            <div className="d-inline-block text-center">
              <input type="file" onChange={this.handleFileUpload} />
            </div>
          }
          {cropping && (
            <h5>Loading...</h5>
          )}
          {croppedImg && (cropping === false) &&
            <img src={URL.createObjectURL(croppedImg)} />
          }
        </div>
        {file &&
          <div className="submit">
            <button onClick={this.applyCrop}>Apply</button>
          </div>
        }
        <img ref={test => this.test = test} />
      </div>
    );
  }
}
