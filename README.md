# gen-summary

Command line utility that can be called to parse a specific Markdown file into a SUMMARY.json file or dictionary with the following format:

```javascript
{
  "array": [
    {
      "title": "Link Title",
      "link": "file.md",
      "sub": [
        {
          "title": "Link Title 3",
          "link": "file3.md",
          "sub": [ ... ]
        },
        ...
      ]
    },
    {
      "title": "Link Title 2",
      "link": "file2.md"
    }
  ],
  "title": ""
}
```

## How to Install

1. Clone the repository
2. Navigate to the root and run `npm install`
3. Run `npm run build`
4. The utility can be used by calling `gensum`
5. Test that you have the utility working by running `gensum -v` to get the version number.
6. You can also try `gensum -h` or `gensum --help`
