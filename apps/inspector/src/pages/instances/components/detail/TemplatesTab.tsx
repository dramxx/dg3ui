import { INSTANCES_TEMPLATES_TAB_DETAILS, IdVar } from '@api';
import { useQuery } from '@apollo/client';
import React from 'react';

import { AllTemplatesType, InstanceTemplatesTabInterface, TabProps, TemplateStatusType } from '../../model';
import { StyledTable } from './styles';

const TemplatesTab = (props: TabProps) => {
  const { instanceId } = props;

  const { data, error, loading } = useQuery<InstanceTemplatesTabInterface, IdVar>(INSTANCES_TEMPLATES_TAB_DETAILS, {
    variables: { id: instanceId },
  });

  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const allTemplates: AllTemplatesType[] = data.instances[0].templatesShouldSatisfy;
  const satisfyTemplates: TemplateStatusType[] = data.instances[0].templatesSatisfy;
  const hasTemplates: boolean = allTemplates.length > 0;
  const satisfyTemplateIds: string[] = satisfyTemplates.map((successfulTemplate) => successfulTemplate.id);

  return (
    <>
      {hasTemplates && (
        <StyledTable>
          <table>
            <thead>
              <tr>
                <th>Template</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allTemplates.map((template) => (
                <tr key={template.id}>
                  <td>{template.localization.name}</td>

                  {satisfyTemplateIds.includes(template.id) ? (
                    <td key={template.id}>✅</td>
                  ) : (
                    <td key={template.id}>❌</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </StyledTable>
      )}

      {!hasTemplates && (
        <p>
          No templates available for instance: <strong>{instanceId}</strong>
        </p>
      )}
    </>
  );
};

export default TemplatesTab;
