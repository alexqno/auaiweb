import React from 'react';
import { Link } from 'react-router-dom';

import {
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroup,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
} from '~/components';

import { KamaleonInput } from '~/pages/components';

import HeaderAuth from '~/routes/components/Pages/HeaderAuth';
import FooterAuth from '~/routes/components/Pages/FooterAuth';

const Error404 = () => (
  <EmptyLayout>
    <EmptyLayout.Section center>
      {/* START Header */}
      <HeaderAuth title="Error 404" />
      {/* END Header */}
      {/* START Form */}
      <Form className="mb-3">
        <FormGroup>
          <Label for="search">Search</Label>
          <InputGroup>
            <KamaleonInput
              type="text"
              name="text"
              id="search"
              placeholder="Enter search phrase here..."
              className="bg-white"
            />
            <InputGroupAddon addonType="append">
              <ThemeConsumer>
                {({ color }) => (
                  <Button color={color} tag={Link} to="/">
                    <i className="fa fa-search" />
                  </Button>
                )}
              </ThemeConsumer>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
      {/* END Form */}
      {/* START Bottom Links */}
      <div className="d-flex mb-5">
        <Link to="/login">Back to Home</Link>
        <Link to="/" className="ml-auto text-decoration-none">
          Support
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayout.Section>
  </EmptyLayout>
);

export default Error404;
