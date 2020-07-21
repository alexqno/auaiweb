import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Button,
  UncontrolledTooltip,
} from '~/components';

import { KamaleonInput } from '~/pages/components';

import { HeaderMain } from '~/routes/components/HeaderMain';

import auaiApi from '~/services/auaiApi';
import history from '~/services/history';

import { notification } from '~/utilities/notification';

export default function Call() {
  const currentUserId = useSelector(state => state.user.profile.id);

  const [protocol, setProtocol] = useState('');

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(0);

  const [clerks, setClerks] = useState([]);
  const [clerkId, setClerkId] = useState([]);

  const [callTypes, setCallTypes] = useState([]);
  const [callType, setCallType] = useState(0);

  const [addDescription, setAddDescription] = useState('');
  const [description, setDescription] = useState('');

  const { protocol: protocolUpdate } = useParams();

  const alterar = !_.isNil(protocolUpdate);

  const pageTitle = useMemo(() => {
    let title = 'Cadastrar Atendimento';
    if (alterar) {
      title = 'Alterar Atendimento';
    }
    return title;
  }, [alterar]);

  const clearState = useCallback(() => {
    setProtocol('');
    setCustomers([]);
    setCustomerId(0);
    setClerks([]);
    setClerkId(0);
    setCallTypes([]);
    setCallType('');
    setDescription('');
    setAddDescription('');
  }, []);

  useEffect(() => {
    async function fillPage() {
      try {
        const resCustomers = await auaiApi.get('/customers');
        setCustomers(resCustomers.data);
      } catch (error) {
        notification(
          'error',
          'Erro',
          'Erro ao carregar os clientes para preenchimento da página.'
        );
      }

      try {
        const resUsers = await auaiApi.get('/users');
        setClerks(resUsers.data);

        const clerkHasUser = resUsers.data.find(u => u.id === currentUserId);
        if (clerkHasUser) {
          setClerkId(currentUserId);
        }
      } catch (error) {
        notification(
          'error',
          'Erro',
          'Erro ao carregar os atendentes para preenchimento da página.'
        );
      }

      try {
        const resCallTypes = await auaiApi.get('/callTypes');
        setCallTypes(resCallTypes.data);
      } catch (error) {
        notification(
          'error',
          'Erro',
          'Erro ao carregar os tipos de atendimento para preenchimento da página.'
        );
      }

      if (alterar) {
        const resCallUpdate = await auaiApi.get(`/calls/${protocolUpdate}`);
        const call = resCallUpdate.data;
        setProtocol(call.protocol);

        if (!_.isNil(call.clerk_id)) {
          console.tron.log(call);
          setClerkId(call.clerk_id);
        }
        if (!_.isNil(call.customer_id)) {
          setCustomerId(call.customer_id);
        }
        if (!_.isNil(call.type)) {
          setCallType(call.type);
        }
        if (!_.isNil(call.description)) {
          setDescription(call.description);
        }
      }
    }

    clearState();
    fillPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alterar]);

  async function fillPageData() {
    const data = {
      customer_id: customerId,
      clerk_id: clerkId,
      type: callType,
      description: addDescription,
    };

    return data;
  }

  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      const response = await auaiApi.post('/calls');

      history.push(`/call/${response.data.protocol}`);
    } catch (error) {
      notification('error', 'Erro', error.response.data.error);
    }
  }

  async function handleAlterar(e) {
    e.preventDefault();
    try {
      const data = await fillPageData();
      console.tron.log(data);
      const response = await auaiApi.put(`/calls/${protocolUpdate}`, data);

      notification('success', response.data.protocol, 'Atendimento salvo');
      history.push('/call/list');
    } catch (error) {
      if (error.response) {
        notification('error', 'Erro', error.response.data.error);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Form onSubmit={alterar ? handleAlterar : handleCadastrar}>
          <HeaderMain title={pageTitle} className="mb-5 mt-4" />
          {/* START Section 1 */}
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  {/* START Form */}
                  {/* START KamaleonInput */}
                  <Row>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="protocol">Protocolo</Label>
                        <KamaleonInput
                          name="protocol"
                          id="protocol"
                          value={protocol}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="clerk">Atendente</Label>
                        <KamaleonInput
                          type="select"
                          name="clerk"
                          id="clerk"
                          value={clerkId}
                          onChange={e => setClerkId(e.target.value)}
                        >
                          <option key={0} value={0}>
                            Selecione...
                          </option>
                          {clerks.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </KamaleonInput>
                      </FormGroup>
                    </Col>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="customer">Cliente</Label>
                        <KamaleonInput
                          type="select"
                          name="customer"
                          id="customer"
                          value={customerId}
                          onChange={e => setCustomerId(e.target.value)}
                        >
                          <option key={0} value={0}>
                            Selecione...
                          </option>
                          {customers.map(c => (
                            <option key={c.id} value={c.id}>
                              {`${c.product} - ${c.name}`}
                            </option>
                          ))}
                        </KamaleonInput>
                      </FormGroup>
                    </Col>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="callType">Tipo</Label>
                        <KamaleonInput
                          type="select"
                          name="callType"
                          id="callType"
                          value={callType}
                          onChange={e => setCallType(e.target.value)}
                        >
                          <option key={0} value={0}>
                            Selecione...
                          </option>
                          {callTypes.map(t => (
                            <option key={t.key} value={t.key}>
                              {t.name}
                            </option>
                          ))}
                        </KamaleonInput>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <FormGroup>
                        <Label for="addDescription">Descrição</Label>
                        <KamaleonInput
                          type="textarea"
                          name="addDescription"
                          id="addDescription"
                          value={addDescription}
                          onChange={e => setAddDescription(e.target.value)}
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target="addDescription"
                        >
                          A nova descrição será adicionada à descrição atual ao
                          confirmar
                        </UncontrolledTooltip>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <FormGroup>
                        <KamaleonInput
                          type="textarea"
                          name="description"
                          id="description"
                          value={description}
                          rows={8}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* END KamaleonInput */}
                  {/* END Form */}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* START Section 1 */}
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardFooter className="p-4 bt-0">
                  <div className="d-flex">
                    <Button
                      color="primary"
                      type="submit"
                      className="ml-auto px-4"
                    >
                      <i className="fa fa-check mr-2" />
                      {alterar ? 'Salvar' : 'Iniciar'}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {/* END Section 1 */}
        </Form>
      </Container>
    </React.Fragment>
  );
}
