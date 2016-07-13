var comment = require('./comment.json'),
     sprint = require('sprint').sprint;

module.exports = {

  activate: function () {
    atom.commands.add('atom-workspace', {
      'translate:toggleSingleQuote': this.toggleSingleQuote
    });
    atom.commands.add('atom-workspace', {
      'translate:toggleDoubleQuote': this.toggleDoubleQuote
    });
  },

  toggleDoubleQuote: function () {
    var editor      = atom.workspace.getActivePaneItem(),
        fileName    = editor.getTitle(),
        range       = editor.getSelectedBufferRange(),
        selection   = editor.getLastSelection(),
        cursor      = editor.getLastCursor(),
        text        = selection.getText(),
        ext         = getExtension(fileName);

    text = text || cursor.getCurrentBufferLine();

    // If more than one line is selected
    if (!range.isEmpty()) {
      toggleCommentsForDoubleQuote(text, ext, editor, range);
    }
  },

  toggleSingleQuote: function () {
    var editor      = atom.workspace.getActivePaneItem(),
        fileName    = editor.getTitle(),
        range       = editor.getSelectedBufferRange(),
        selection   = editor.getLastSelection(),
        cursor      = editor.getLastCursor(),
        text        = selection.getText(),
        ext         = getExtension(fileName);

    text = text || cursor.getCurrentBufferLine();

    // If more than one line is selected
    if (!range.isEmpty()) {
      toggleCommentsForSingleQuote(text, ext, editor, range);
    }
  },
};

function toggleCommentsForDoubleQuote(text, ext, editor, range) {
  var modifiedText = '',
      prefix = comment.doublequote.prefix[ext],
      suffix = comment.doublequote.suffix[ext];

  console.log(text);
  console.log(range);

  modifiedText = prefix + text + suffix;
  editor.insertText(modifiedText);

  return modifiedText;
}

function toggleCommentsForSingleQuote(text, ext, editor, range) {
  var modifiedText = '',
      prefix = comment.singlequote.prefix[ext],
      suffix = comment.singlequote.suffix[ext];

  console.log(text);
  console.log(range);

  modifiedText = prefix + text + suffix;
  editor.insertText(modifiedText);

  return modifiedText;
}


// function toggleHtmlSingleLineOrEmptySelection(ext, editor) {
//
//   var range, text, selection;
//
//   // Make selection
//   editor.moveToEndOfLine();
//   editor.selectToBeginningOfLine();
//
//   range = editor.getSelectedBufferRange();
//   selection = editor.getLastSelection();
//   text = selection.getText();
//
//   editor.setTextInBufferRange(range, toggleComments(text, ext, 'singleline'));
//   editor.moveDown();
//   editor.moveToBeginningOfLine();
// }
//
//
// function toggleComments(text, ext, type) {
//
//   var prefix = comment[type].prefix[ext],
//       suffix = comment[type].suffix[ext],
//       modifiedText;
//
//
//   if (isCommented(text, ext, type)) {
//     modifiedText = removeComment(text, ext, type);
//   } else {
//     modifiedText = addComment(text, ext, type);
//   }
//
//   return modifiedText;
// }
//
// function toggleCommentsForUnsupportedMultiline(text, ext) {
//
//     var modifiedText = '',
//         prefix = comment.singleline.prefix[ext],
//         lines = text.split('\n');
//
//     lines.pop();
//     lines.forEach(function(line) {
//         if (isSingleLineCommented(line, prefix)) {
//             modifiedText += line.substr(1, line.length) + '\n';
//         } else {
//             modifiedText += '#' + line + '\n';
//         }
//
//     });
//
//     return modifiedText;
// }
//
//
// function addComment(text, ext, type) {
//     var prefix = comment[type].prefix[ext],
//         suffix = comment[type].suffix[ext];
//
//     return prefix + text + suffix;
// }
//
//
// function removeComment(text, ext, type) {
//     var prefix = comment[type].prefix[ext],
//         suffix = comment[type].suffix[ext],
//         strippedText;
//
//     strippedText = text.substr(prefix.length, text.length);
//     strippedText = strippedText.substr(0, strippedText.length - suffix.length);
//
//     return strippedText;
// }
//
//
// function isCommented(text, ext, type) {
//     var prefixLength = comment[type].prefix[ext].length,
//         suffixLength = comment[type].suffix[ext].length,
//         commentStartMatch, commentEndMatch;
//
//     commentStartMatch = (text.substr(0, prefixLength) === comment[type].prefix[ext]);
//     commentEndMatch = (text.substr(text.length - suffixLength, text.length) === comment[type].suffix[ext]);
//
//     return commentStartMatch && commentEndMatch;
// }
//
//
// function isSingleLineCommented(text, prefix) {
//     return text.substr(0, prefix.length) === prefix;
// }


function getExtension(fileName) {
    var components = fileName.split('.');
    return components[components.length-1];
}

// function supportsMultiline(ext) {
//     return comment.multiline.suffix[ext].length > 0;
// }
//
// function isUnsupportedSingleLine(ext) {
//     return (ext.indexOf('htm') > -1) || ext === 'md' || ext === 'css';
// }
