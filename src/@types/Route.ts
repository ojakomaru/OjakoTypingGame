import { ComponentType } from "react";

/**
 * Represents the route of a page.
 */
export type Route = {
  /**
   * ルートのkey
   * @type {string}
   * @memberof Route
   * @required
   * @example
   * "dashboard"
   */
  key: string;

  /**
   * ルートのタイトル
   * @type {string}
   * @memberof Route
   * @required
   * @example
   * "My Dashboard"
   */
  title: string;

  /**
   * ルートの説明
   * @type {string}
   * @memberof Route
   * @required
   * @example
   * "Go to My Dashboard Page"
   */
  description?: string;

  /**
   * ルートのパス
   * @type {string}
   * @memberof Route
   * @required
   * @example
   * "/dashboard"
   */
  path?: string;

  /**
   * ルートで読み込むコンポーネント
   * @type {FC}
   * @memberof Route
   * @required
   * @example
   * "<Dashboard />"
   */
  component?: any;

  /**
   * ルートの起動フラグ
   * @type {boolean}
   * @memberof Route
   * @required
   * @default
   * true
   */
  isEnabled: boolean;

  /**
   * ルートを示すアイコン
   * @type {string}
   * @memberof Route
   * @optional
   * @example
   * DashboardIcon
   */
  icon?: ComponentType;

  /**
   * サブルートの配列
   * @type {Route[]}
   * @memberof Route
   * @optional
   * @example
   * "[{} as Route, ...]"
   */
  subRoutes?: Route[];

  /**
   * ルートの仕切り表示
   * @type {boolean}
   * @memberof Route
   * @optional
   * @default
   * false
   */
  appendDivider?: boolean;

  /**
   * メニュー項目が展開されていることを示す
   * @type {boolean}
   * @memberof Route
   * @optional
   * @default
   * false
   */
  expanded?: boolean;
};
