import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

const getInitialState = () => ({
  file: null,
  crop: {
    aspect: 1,
  },
  pixelCrop: null,
  cropping: false,
  croppedImg: null,
});

export default class Test extends React.Component {
  static defaultProps = {
    file: null,
    crop: {
      aspect: 1,
    },
    pixelCrop: null,
    cropping: false,
    croppedImg: null,
  };

  static propTypes = {
    file: PropTypes.object,
    crop: PropTypes.shape({
      aspect: PropTypes.number.isRequired,
    }),
    pixelCrop: PropTypes.object,
    cropping: PropTypes.bool,
    croppedImg: PropTypes.object,
  }

  state = {
    file: this.props.file,
    crop: this.props.crop,
    pixelCrop: this.props.pixelCrop,
    cropping: this.props.cropping,
    croppedImg: this.props.croppedImg,
  };

  onCropChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  }

  onFileDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length) {
      this.setState({ file: acceptedFiles[0] });
    }
  }

  cropFile = () => new Promise((resolve, reject) => {
    const { file, pixelCrop } = this.state;
    if (file && pixelCrop) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
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
          pixelCrop.height,
        );
        canvas.toBlob((croppedfile) => {
          if (croppedfile) {
            const croppedFile = croppedfile;
            croppedFile.name = fileName;
            resolve(croppedFile);
          } else {
            reject();
          }
        }, 'image/jpeg');
      };
    } else {
      reject();
    }
  });

  applyCrop = () => {
    this.setState({ cropping: true });
    this.cropFile()
      .then((file) => {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        this.setState({ cropping: false, croppedImg: file });
      })
      .catch(() => this.clear());
  }

  clear = () => {
    this.setState(getInitialState());
  }

  uploadImage = () => {
    const { croppedImg: image } = this.state;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', Math.random());
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then(() => this.clear())
      .catch((err) => {
        console.log('uploadErr:::', err);
        this.clear();
      });
  }

  render() {
    const {
      file,
      crop,
      pixelCrop,
      cropping,
      croppedImg,
    } = this.state;

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
            <div className="drop-box-wrap">
              <Dropzone
                className="drop-box d-flex justify-content-center align-items-center"
                onDrop={this.onFileDrop}
                accept="image/jpeg"
                multiple={false}
              >
                Try dropping a file here or click to select file to upload.
              </Dropzone>
            </div>
          }
          {cropping && (
            <h5>Loading...</h5>
          )}
          {croppedImg && (cropping === false) &&
            <img src={URL.createObjectURL(croppedImg)} alt="loading..." />
          }
        </div>
        {file && croppedImg === null &&
          <div className="submit d-flex justify-content-between">
            <button onClick={this.clear}>Clear</button>
            <button disabled={!pixelCrop} onClick={this.applyCrop}>Apply</button>
          </div>
        }
        {croppedImg &&
          <div className="upload d-flex justify-content-between">
            <button onClick={this.clear}>Clear</button>
            <button onClick={this.uploadImage}>Upload</button>
          </div>
        }
      </div>
    );
  }
}
