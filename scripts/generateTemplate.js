const { exec } = require('child_process');
const fs = require('fs');
const format = require('prettier-eslint');
const uuid = require('uuid/v1');

const eslintConfig = JSON.parse(fs.readFileSync(`${__dirname}/../.eslintrc`));
const prettierOptions = JSON.parse(
  fs.readFileSync(`${__dirname}/../.prettierrc`),
);

const id = uuid();
const filePath = `${__dirname}/../app/templates/${id}.js`;

const body = `
export default {
  id: '${id}',
  elements: [
    {
      type: 'flexbox',
      alignItems: 'center',
      justifyContent: 'center',
      elements: [
        {
          type: 'text',
          bind: 'title',
          fontSize: 90,
          fontWeight: 900,
          top: '50%',
          left: '50%',
        },
      ]
    }
  ],
  form: {
    title: {
      type: 'text',
      label: 'Title',
      placeholder: 'Lorem ipsum',
    },
  },
};
`;

const options = {
  text: body,
  eslintConfig,
  prettierOptions,
};

fs.writeFileSync(filePath, format(options));

exec(`code ${filePath}`);
