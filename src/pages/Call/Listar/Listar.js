import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
} from '~/components';

import { BlockUI } from '~/pages/components';

import { HeaderMain } from '~/routes/components/HeaderMain';

import history from '~/services/history';
import auaiApi from '~/services/auaiApi';

import { notification } from '~/utilities/notification';

export default function Tables() {
  const dispatch = useDispatch();

  const [calls, setCalls] = useState([]);

  const loadCalls = useCallback(async () => {
    try {
      dispatch({
        type: 'BLOCK_UI',
      });

      const response = await auaiApi.get('/calls');
      if (response) {
        setCalls(response.data);
      }
    } catch (error) {
      notification(
        'error',
        'Erro',
        'Não foi possível carregar a lista de atendimentos'
      );
    } finally {
      dispatch({
        type: 'UNBLOCK_UI',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alterar(protocol) {
    history.push(`/call/${protocol}`);
  }

  async function finalizar(e, protocol) {
    e.preventDefault();
    try {
      await auaiApi.put(`/finishCalls/${protocol}`);

      notification('success', 'Sucesso', 'Atendimento finalizado');
      loadCalls();
    } catch (error) {
      notification('error', 'Erro', error.response.data.error);
    }
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Listar Estabelecimentos" className="mb-5 mt-4" />

        {/* START Section 9 */}
        <BlockUI>
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  {/* START Table */}
                  <Table className="mb-0" hover responsive>
                    <thead>
                      <tr>
                        <th className="bt-0">Protocolo</th>
                        <th className="bt-0">Status</th>
                        <th className="bt-0">Tipo</th>
                        <th className="bt-0">Atendente</th>
                        <th className="bt-0">Cliente</th>
                        <th className="bt-0" width="1%" />
                        <th className="bt-0" width="1%" />
                      </tr>
                    </thead>
                    <tbody>
                      {calls.map(call => (
                        <tr className="" key={call.id}>
                          <td className="align-middle">{call.protocol}</td>
                          <td className="align-middle">{call.statusName}</td>
                          <td className="align-middle">{call.typeName}</td>
                          <td className="align-middle">
                            {call.clerk ? call.clerk.name : '-'}
                          </td>
                          <td className="align-middle">
                            {call.customer ? call.customer.name : '-'}
                          </td>
                          <td className="align-middle text-right">
                            <Button
                              className="mr-2"
                              size="sm"
                              title="Atualizar"
                              color="secondary"
                              onClick={() => alterar(call.protocol)}
                              outline
                            >
                              <i className="fa fa-fw fa-pencil-square-o" />
                            </Button>
                          </td>
                          <td className="align-middle text-right">
                            <Button
                              className="mr-2"
                              size="sm"
                              title="Finalizar"
                              color="success"
                              onClick={e => finalizar(e, call.protocol)}
                              outline
                            >
                              <i className="fa fa-fw fa-flag-checkered" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* END Table */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </BlockUI>
        {/* END Section 9 */}
      </Container>
    </React.Fragment>
  );
}
