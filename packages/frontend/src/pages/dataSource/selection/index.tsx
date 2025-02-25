import React, { useState } from 'react';
import { Modal, ChoiceGroup, IconButton, ProgressIndicator } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import intl from 'react-intl-universal';
import { IDataSourceType } from '../../../global';

import { useDataSourceTypeOptions } from '../config';
import FileData from './file';
import DemoData from './demo';
import ClickHouseData from './clickhouse';
import { IRawField, IRow } from '../../../interfaces';

interface SelectionProps {
    show: boolean;
    loading: boolean;
    onClose: () => void;
    onStartLoading: () => void;
    onLoadingFailed: (err: any) => void;
    onDataLoaded: (fields: IRawField[], dataSource: IRow[]) => void;
}
const Selection: React.FC<SelectionProps> = props => {
    const { show, onClose, onDataLoaded, loading, onStartLoading, onLoadingFailed } = props;

    const [dataSourceType, setDataSourceType] = useState<IDataSourceType>(IDataSourceType.FILE);
    const dsTypeOptions = useDataSourceTypeOptions();

    const dsTypeLabelId = useId('dataSourceType');


    return (
        <Modal containerClassName="vi-callout" onDismiss={onClose} isOpen={show}>
            <div className="vi-callout-header">
                <span className="vi-callout-title">{intl.get("dataSource.upload.title")}</span>
                <IconButton className="vi-callout-close-icon" iconProps={{ iconName: "Cancel" }} onClick={onClose} />
            </div>
            <div className="vi-callout-inner">
                <ChoiceGroup
                    options={dsTypeOptions}
                    selectedKey={dataSourceType}
                    onChange={(ev, option) => {
                        if (option) {
                            setDataSourceType(option.key as IDataSourceType);
                        }
                    }}
                    ariaLabelledBy={dsTypeLabelId}
                />
                {loading && <ProgressIndicator description="loading" />}
                {dataSourceType === IDataSourceType.FILE && <FileData onClose={onClose} onDataLoaded={onDataLoaded} onLoadingFailed={onLoadingFailed} onStartLoading={onStartLoading} />}
                {dataSourceType === IDataSourceType.DEMO && <DemoData onClose={onClose} onDataLoaded={onDataLoaded} onLoadingFailed={onLoadingFailed} onStartLoading={onStartLoading} />}
                {dataSourceType === IDataSourceType.CLICKHOUSE && <ClickHouseData onClose={onClose} onDataLoaded={onDataLoaded} />}
            </div>
        </Modal>
    );
}

export default Selection;
