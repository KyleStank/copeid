export interface IEnviroment {
  /**
   * As name suggests, app will be optimized for production when true.
   */
  production: boolean;

  /**
   * When true, app will use `HashLocationStrategy`. By default, Angular's routing requires the app to be ran on a server.
   * When using HashLocationStrategy, this is not the case. The app can now be ran by simply loading the `index.html` file into any browser.
   * This is very useful for lightweight apps and/or testing builds locally.
   *
   * @note
   * Make sure to add `--base-href #` to `ng build` when building for local environments.
   * Missing this argument will cause an unhandled routing exception to occur in the built app.
   */
  local: boolean;
};
