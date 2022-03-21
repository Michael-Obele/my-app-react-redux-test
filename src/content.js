import React, { useState } from 'react';
import * as p from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { marked } from 'marked';
// or const { marked } = require('marked');

export const Content = () => {
  const dummyText = `
  # Heading level 1

  ## Heading level 2

  ### A Link
  This is my [Website](https://moaconcept.xyz).

  ### A code
  At the command prompt, type ${'`nano`'}

  ### A code block
   <html>
      <head>
      <h1>Hey</h1>
      <h2>You</h2>
      </head>
    </html>

# Something more
  `;
  const DarkMode = useSelector((state) => state.DarkMode);
  const dark = () => {
    return {
      bg: () => {
        return DarkMode ? 'dark' : 'light';
      },
      text: () => {
        return DarkMode ? 'light' : 'dark';
      },
      color: () => {
        return DarkMode ? 'white' : 'black';
      },
      backgroundColor: () => {
        return DarkMode ? '#212529' : 'white';
      },
    };
  };
  const [markdown, setMarkdown] = useState(dummyText);
  const updateMarkdown = (markdown) => {
    setMarkdown(markdown);
  };
  function createMarkup() {
    return { __html: marked.parse(markdown).replace(/(<\/h(1|2)>)/gm, '<hr>') };
  }
  function TheMarkup() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  return (
    <div>
      <p.Row id='input' className='justify-content-center'>
        <p.Card
          id='output'
          border='dark'
          text={dark().text()}
          bg={dark().bg()}
          style={{ height: 'fit-content', width: '50vw' }}
        >
          <p.Card.Header>Editor</p.Card.Header>

          <p.Form.Control
            as='textarea'
            style={{
              height: '30vh',
              backgroundColor: dark().backgroundColor(),
              color: dark().color(),
            }}
            value={markdown}
            onChange={(e) => {
              updateMarkdown(e.target.value);
            }}
          />
        </p.Card>
        <p.Card
          id='output'
          border='dark'
          text={dark().text()}
          bg={dark().bg()}
          style={{ height: 'fit-content', width: '50vw' }}
        >
          <p.Card.Header>Preview</p.Card.Header>
          <p.Card.Body>
            <p.Card.Text>
              <TheMarkup />
            </p.Card.Text>
          </p.Card.Body>
        </p.Card>
      </p.Row>
    </div>
  );
};
