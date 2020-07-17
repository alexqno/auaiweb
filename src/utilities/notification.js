import React from 'react';
import { toast } from 'react-toastify';

import { Media } from '~/components';

let lastType = '';
let lastMessage = '';
let lastTime = new Date();

const contentSuccess = (title, message) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-check" />
    </Media>
    <Media body>
      <Media heading tag="h6">
        {title}
      </Media>
      <p>{message}</p>
      {/* <div className="d-flex mt-2">
        <Button color="success" onClick={closeToast}>
          I Understand
        </Button>
        <Button
          color="link"
          onClick={closeToast}
          className="ml-2 text-success"
        >
          Cancel
        </Button>
      </div> */}
    </Media>
  </Media>
);
// eslint-disable-next-line react/prop-types
const contentError = (title, message) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-close" />
    </Media>
    <Media body>
      <Media heading tag="h6">
        {title}
      </Media>
      <p>{message}</p>
      {/* <div className="d-flex mt-2">
        <Button color="success" onClick={closeToast}>
          I Understand
        </Button>
        <Button
          color="link"
          onClick={closeToast}
          className="ml-2 text-success"
        >
          Cancel
        </Button>
      </div> */}
    </Media>
  </Media>
);
// eslint-disable-next-line react/prop-types
const contentInfo = (title, message) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-info" />
    </Media>
    <Media body>
      <Media heading tag="h6">
        {title}
      </Media>
      <p>{message}</p>
      {/* <div className="d-flex mt-2">
        <Button color="success" onClick={closeToast}>
          I Understand
        </Button>
        <Button
          color="link"
          onClick={closeToast}
          className="ml-2 text-success"
        >
          Cancel
        </Button>
      </div> */}
    </Media>
  </Media>
);
// eslint-disable-next-line react/prop-types
const contentWarning = (title, message) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-exclamation" />
    </Media>
    <Media body>
      <Media heading tag="h6">
        {title}
      </Media>
      <p>{message}</p>
      {/* <div className="d-flex mt-2">
        <Button color="success" onClick={closeToast}>
          I Understand
        </Button>
        <Button
          color="link"
          onClick={closeToast}
          className="ml-2 text-success"
        >
          Cancel
        </Button>
      </div> */}
    </Media>
  </Media>
);
// eslint-disable-next-line react/prop-types
const contentDefault = (title, message) => (
  <Media>
    <Media middle left className="mr-3">
      <i className="fa fa-fw fa-2x fa-question" />
    </Media>
    <Media body>
      <Media heading tag="h6">
        {title}
      </Media>
      <p>{message}</p>
      {/* <div className="d-flex mt-2">
        <Button color="success" onClick={closeToast}>
          I Understand
        </Button>
        <Button
          color="link"
          onClick={closeToast}
          className="ml-2 text-success"
        >
          Cancel
        </Button>
      </div> */}
    </Media>
  </Media>
);

export function notification(type = 'info', title, message) {
  if (
    lastType === type &&
    lastMessage === message &&
    new Date() - lastTime < 3000
  ) {
    return;
  }

  lastTime = new Date();
  lastType = type;
  lastMessage = message;

  switch (type) {
    case 'info':
      toast.info(contentInfo(title, message));
      break;
    case 'success':
      toast.success(contentSuccess(title, message));
      break;
    case 'warning':
      toast.warning(contentWarning(title, message));
      break;
    case 'error':
      toast.error(contentError(title, message));
      break;
    default:
      toast(contentDefault(title, message));
      break;
  }
}
