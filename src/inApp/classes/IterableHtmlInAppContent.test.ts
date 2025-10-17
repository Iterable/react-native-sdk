import { IterableEdgeInsets } from '../../core';

import { IterableInAppContentType } from '../enums';
import { IterableHtmlInAppContent } from './IterableHtmlInAppContent';
import type { IterableHtmlInAppContentRaw } from '../types';

describe('IterableHtmlInAppContent', () => {
  describe('constructor', () => {
    it('should create instance with valid parameters', () => {
      // GIVEN valid parameters
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);
      const html = '<div>Hello World</div>';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should have the correct properties
      expect(content.edgeInsets).toBe(edgeInsets);
      expect(content.html).toBe(html);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance with empty HTML', () => {
      // GIVEN empty HTML
      const edgeInsets = new IterableEdgeInsets(0, 0, 0, 0);
      const html = '';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should have empty HTML
      expect(content.html).toBe('');
      expect(content.edgeInsets).toBe(edgeInsets);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance with complex HTML', () => {
      // GIVEN complex HTML content
      const edgeInsets = new IterableEdgeInsets(5, 10, 15, 20);
      const html = `
        <html>
          <head>
            <title>Test</title>
            <style>
              body { font-family: Arial; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome</h1>
              <p>This is a test message</p>
            </div>
          </body>
        </html>
      `;

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should have the complex HTML
      expect(content.html).toBe(html);
      expect(content.edgeInsets).toBe(edgeInsets);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance with HTML containing special characters', () => {
      // GIVEN HTML with special characters
      const edgeInsets = new IterableEdgeInsets(1, 2, 3, 4);
      const html = '<div>Hello &amp; Welcome! "Test" &lt;tag&gt;</div>';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should preserve special characters
      expect(content.html).toBe(html);
      expect(content.edgeInsets).toBe(edgeInsets);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance with HTML containing JavaScript', () => {
      // GIVEN HTML with JavaScript
      const edgeInsets = new IterableEdgeInsets(10, 10, 10, 10);
      const html = `
        <div>
          <script>
            console.log('Hello from in-app message');
          </script>
          <p>Content with script</p>
        </div>
      `;

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should preserve the JavaScript
      expect(content.html).toBe(html);
      expect(content.edgeInsets).toBe(edgeInsets);
      expect(content.type).toBe(IterableInAppContentType.html);
    });
  });

  describe('fromDict', () => {
    it('should create instance from valid dictionary', () => {
      // GIVEN a valid dictionary
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: 10,
          left: 20,
          bottom: 30,
          right: 40,
        },
        html: '<div>Hello World</div>',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should have the correct properties
      expect(content.html).toBe('<div>Hello World</div>');
      expect(content.edgeInsets.top).toBe(10);
      expect(content.edgeInsets.left).toBe(20);
      expect(content.edgeInsets.bottom).toBe(30);
      expect(content.edgeInsets.right).toBe(40);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance from dictionary with empty HTML', () => {
      // GIVEN a dictionary with empty HTML
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        html: '',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should have empty HTML
      expect(content.html).toBe('');
      expect(content.edgeInsets.top).toBe(0);
      expect(content.edgeInsets.left).toBe(0);
      expect(content.edgeInsets.bottom).toBe(0);
      expect(content.edgeInsets.right).toBe(0);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance from dictionary with complex HTML', () => {
      // GIVEN a dictionary with complex HTML
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: 5,
          left: 10,
          bottom: 15,
          right: 20,
        },
        html: `
          <html>
            <head><title>Test</title></head>
            <body>
              <div class="content">
                <h1>Title</h1>
                <p>Paragraph with <strong>bold</strong> text</p>
              </div>
            </body>
          </html>
        `,
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should have the complex HTML
      expect(content.html).toBe(dict.html);
      expect(content.edgeInsets.top).toBe(5);
      expect(content.edgeInsets.left).toBe(10);
      expect(content.edgeInsets.bottom).toBe(15);
      expect(content.edgeInsets.right).toBe(20);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance from dictionary with negative edge insets', () => {
      // GIVEN a dictionary with negative edge insets
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: -5,
          left: -10,
          bottom: -15,
          right: -20,
        },
        html: '<div>Negative insets</div>',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should have negative edge insets
      expect(content.html).toBe('<div>Negative insets</div>');
      expect(content.edgeInsets.top).toBe(-5);
      expect(content.edgeInsets.left).toBe(-10);
      expect(content.edgeInsets.bottom).toBe(-15);
      expect(content.edgeInsets.right).toBe(-20);
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should create instance from dictionary with decimal edge insets', () => {
      // GIVEN a dictionary with decimal edge insets
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: 1.5,
          left: 2.7,
          bottom: 3.9,
          right: 4.1,
        },
        html: '<div>Decimal insets</div>',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should have decimal edge insets
      expect(content.html).toBe('<div>Decimal insets</div>');
      expect(content.edgeInsets.top).toBe(1.5);
      expect(content.edgeInsets.left).toBe(2.7);
      expect(content.edgeInsets.bottom).toBe(3.9);
      expect(content.edgeInsets.right).toBe(4.1);
      expect(content.type).toBe(IterableInAppContentType.html);
    });
  });

  describe('property access', () => {
    it('should allow property modification', () => {
      // GIVEN an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(
        new IterableEdgeInsets(10, 20, 30, 40),
        '<div>Original</div>'
      );

      // WHEN modifying properties
      const newEdgeInsets = new IterableEdgeInsets(100, 200, 300, 400);
      content.edgeInsets = newEdgeInsets;
      content.html = '<div>Modified</div>';

      // THEN the properties should be updated
      expect(content.edgeInsets).toBe(newEdgeInsets);
      expect(content.html).toBe('<div>Modified</div>');
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should maintain type property as html', () => {
      // GIVEN an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(
        new IterableEdgeInsets(10, 20, 30, 40),
        '<div>Test</div>'
      );

      // THEN the type should always be html
      expect(content.type).toBe(IterableInAppContentType.html);

      // AND it should remain html even after property changes
      content.html = '<div>Changed</div>';
      expect(content.type).toBe(IterableInAppContentType.html);
    });
  });

  describe('edge cases', () => {
    it('should handle HTML with only whitespace', () => {
      // GIVEN HTML with only whitespace
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);
      const html = '   \n\t   ';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should preserve the whitespace
      expect(content.html).toBe('   \n\t   ');
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should handle HTML with unicode characters', () => {
      // GIVEN HTML with unicode characters
      const edgeInsets = new IterableEdgeInsets(5, 5, 5, 5);
      const html = '<div>Hello 世界 🌍 🚀</div>';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should preserve unicode characters
      expect(content.html).toBe('<div>Hello 世界 🌍 🚀</div>');
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should handle very long HTML content', () => {
      // GIVEN very long HTML content
      const edgeInsets = new IterableEdgeInsets(1, 1, 1, 1);
      const longHtml = '<div>' + 'x'.repeat(10000) + '</div>';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, longHtml);

      // THEN it should handle the long content
      expect(content.html).toBe(longHtml);
      expect(content.html.length).toBe(longHtml.length); // Should match the original length
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should handle HTML with malformed tags', () => {
      // GIVEN HTML with malformed tags
      const edgeInsets = new IterableEdgeInsets(10, 10, 10, 10);
      const html = '<div>Unclosed tag <p>Another unclosed <span>Nested</div>';

      // WHEN creating an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(edgeInsets, html);

      // THEN it should preserve the malformed HTML
      expect(content.html).toBe(html);
      expect(content.type).toBe(IterableInAppContentType.html);
    });
  });

  describe('interface compliance', () => {
    it('should implement IterableInAppContent interface', () => {
      // GIVEN an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(
        new IterableEdgeInsets(10, 20, 30, 40),
        '<div>Test</div>'
      );

      // THEN it should have the required type property
      expect(content).toHaveProperty('type');
      expect(typeof content.type).toBe('number');
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should be assignable to IterableInAppContent', () => {
      // GIVEN an IterableHtmlInAppContent instance
      const content = new IterableHtmlInAppContent(
        new IterableEdgeInsets(10, 20, 30, 40),
        '<div>Test</div>'
      );

      // WHEN assigning to IterableInAppContent
      const inAppContent: { type: IterableInAppContentType } = content;

      // THEN it should work without type errors
      expect(inAppContent.type).toBe(IterableInAppContentType.html);
    });
  });

  describe('fromDict with edge cases', () => {
    it('should handle dictionary with NaN edge insets', () => {
      // GIVEN a dictionary with NaN edge insets
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: NaN,
          left: NaN,
          bottom: NaN,
          right: NaN,
        },
        html: '<div>NaN insets</div>',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should handle NaN values
      expect(content.html).toBe('<div>NaN insets</div>');
      expect(content.edgeInsets.top).toBeNaN();
      expect(content.edgeInsets.left).toBeNaN();
      expect(content.edgeInsets.bottom).toBeNaN();
      expect(content.edgeInsets.right).toBeNaN();
      expect(content.type).toBe(IterableInAppContentType.html);
    });

    it('should handle dictionary with Infinity edge insets', () => {
      // GIVEN a dictionary with Infinity edge insets
      const dict: IterableHtmlInAppContentRaw = {
        edgeInsets: {
          top: Infinity,
          left: -Infinity,
          bottom: Infinity,
          right: -Infinity,
        },
        html: '<div>Infinity insets</div>',
      };

      // WHEN creating from dictionary
      const content = IterableHtmlInAppContent.fromDict(dict);

      // THEN it should handle Infinity values
      expect(content.html).toBe('<div>Infinity insets</div>');
      expect(content.edgeInsets.top).toBe(Infinity);
      expect(content.edgeInsets.left).toBe(-Infinity);
      expect(content.edgeInsets.bottom).toBe(Infinity);
      expect(content.edgeInsets.right).toBe(-Infinity);
      expect(content.type).toBe(IterableInAppContentType.html);
    });
  });
});
