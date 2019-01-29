import React, { Component, Fragment } from "react";
import CodeEditor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import dark from "prism-react-renderer/themes/nightOwl";
import cn from "../../utils/cn";

class Editor extends Component {
  static defaultProps = {
    language: "jsx",
    theme: dark
  };

  state = {
    code: this.props.code
  };

  handleValueChange = code => {
    this.setState({ code });

    if (this.props.onChange) {
      this.props.onChange(code);
    }
  };

  highlight = code => {
    const { theme, language } = this.props;
    return (
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Fragment>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Fragment>
        )}
      </Highlight>
    );
  };

  render() {
    const {
      className,
      code,
      language,
      onChange,
      theme,
      style,
      ...rest
    } = this.props;

    return (
      <CodeEditor
        value={this.state.code}
        onValueChange={this.handleValueChange}
        className={className}
        highlight={this.highlight}
        padding=".5rem"
        style={{
          boxSizing: "border-box",
          ...theme.plain,
          ...style
        }}
        {...rest}
      />
    );
  }
}

export default Editor;
