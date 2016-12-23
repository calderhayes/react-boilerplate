import * as React from 'react';

export interface IHelloProps {
    name: string;
}

export interface IHelloState {

}

export class Hello extends React.Component<IHelloProps, IHelloState> {
    public render() {
        return <div>Hello, {this.props.name}</div>;
    }
}
