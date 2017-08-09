import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import {Hello} from '../../../src/view/components/example';
import * as chai from 'chai';

describe('Hello', () => {
    let renderer: TestUtils.ShallowRenderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<Hello name='Willson' />);
    });

    it('should render correctly', () => {
        const result = renderer.getRenderOutput();
        chai.assert.strictEqual(result.type, 'div');
    });

    it('should have correct prop values', () => {
        const result = renderer.getRenderOutput();
        const propValues = result.props.children.join('');
        chai.assert.strictEqual(propValues, 'Hello, Willson');
    });
});
