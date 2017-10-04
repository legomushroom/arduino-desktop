import builder from './helpers/builder';
import classNamesFunction from './helpers/classnames';

/* Decorator: `style`.
    Overrides clean class names with CSS Modules `hash` classes.
    @param {CLASSES} CSS Modules hash classes map
    @sample:
      @classNames(CLASSES)
      class SomeComponent extends Component {
        render() {
          return (<div className="some-class" />);
        }
      }
      // `some-class` will be overwritten with `hash` from the `CLASSES`
*/
export const style = function classNamesDecorator(styles) {
  const fun = classNamesFunction(styles);
  const decorator = builder([fun]);
  (decorator as any).__decorFunction = fun;
  return decorator;
};
