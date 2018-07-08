import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

export default ({ username }) => (
  <Card style={{ textAlign: 'center', marginTop: '50px', marginBottom: '40px' }}>
    <CardTitle title={username} />
  </Card>
);
