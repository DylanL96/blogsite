import React from 'react';

export const showErrorMessage = message => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
)

export const showSuccessMessage = message => (
  <div className="alert alert-success" role="alert">
    {message}
  </div>
)