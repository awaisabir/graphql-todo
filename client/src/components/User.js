import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

export default ({username}) => (
  <Card>
    <CardTitle title={username} />
  </Card>
);

