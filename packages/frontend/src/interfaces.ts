// define new interfaces here, global.ts is no longer maintained.
import { IFieldSummary, IInsightSpace } from "visual-insights";
import { Aggregator, BIField, BIFieldType, FieldType } from "./global";

export interface IRow {
    [key: string]: any
}

// export interface IRawField extends BIField {
//     disable: boolean;
// }

interface IFieldBase {
    fid: string;
    analyticType: BIFieldType;
    semanticType: FieldType;
}
export interface IRawField extends IFieldBase {
    disable: boolean;
}

export interface IFieldMeta extends IFieldBase {
    /**
     * 性质上是计算属性，只读。
     */
    features: {
        entropy: number;
        maxEntropy: number;
        [key: string]: any
    };
    distribution: Array<{ memberName: string; count: number }>;
}

export enum IComputeMode {
    server = 'server',
    worker = 'worker'
}

export type IAnalyticType = 'dimension' | 'measure';

export interface PreferencePanelConfig {
    aggregator: Aggregator;
    defaultAggregated: boolean;
    defaultStack: boolean;
    visMode: 'common' | 'dist'
}
export interface IDBFieldMeta {
    fid: string;
    dataType: string;
}

export type IECStatus = 'none' | 'proxy' | 'engine';

export interface ISyncEngine {
    fields: IFieldSummary[];
    dataSource: IRow[];
    insightSpaces: IInsightSpace[]
}