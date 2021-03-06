import React, { Component, PropTypes } from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../styles';

export class UserField extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    shouldRenderErrorLabel: PropTypes.bool,
    renderErrorLabel: PropTypes.func,
    error: PropTypes.string,
    containerStyle: View.propTypes.style,
  };

  static defaultProps = {
    multiline: false,
    autoFocus: true,
    blurOnSubmit: true,
    autoCorrect: false,
    placeholder: 'Username / Email',
    autoCapitalize: 'none',
    shouldRenderErrorLabel: true,
    containerStyle: null,
  };

  clear() {
    if (this.textInput) {
      this.textInput.clear();
    }
  }

  isFocused() {
    return this.textInput && this.textInput.isFocused();
  }

  focus() {
    if (this.textInput && this.textInput.focus) {
      this.textInput.focus();
    }
  }

  renderError() {
    const {
      error,
      renderErrorLabel,
      shouldRenderErrorLabel,
    } = this.props;
    if (!shouldRenderErrorLabel || !error) return null;

    if (renderErrorLabel) return renderErrorLabel(error);

    return (
      <Text style={[styles.simpleText]}>{error}</Text>
    );
  }

  render() {
    const { style, containerStyle, ...restProps } = this.props;
    return (
      <View style={[styles.simpleFlexContainer, containerStyle]}>
        <TextInput
          {...restProps}
          style={[styles.simpleInput, style]}
          // eslint-disable-next-line no-return-assign
          ref={ref => this.textInput = ref}
        />

        {this.renderError()}
      </View>
    );
  }
}
