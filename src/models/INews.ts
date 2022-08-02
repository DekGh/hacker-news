export interface INews {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string
}

export interface IComment {
    by: string;
    id: number;
    kids: number[] | object[];
    parent: number;
    text: string;
    time: number;
    type: string
}