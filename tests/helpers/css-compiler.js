import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
  extensions: ['.scss'],
  preprocessCss: function (css) {
    var result =  sass.renderSync({
      data: css
    });

    return result.css;
  }
});