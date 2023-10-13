import "./OTableGrid.scss";

type Props = {
  columns: any[];
  data: any[];
  textOverflow?: boolean;
  height?: string;
  scroll?: {
    x?: boolean;
    y?: boolean;
  };
  noDataMessage?: string;
  onLineClick?: (line: any) => void;
};

const OTableGrid = (props: Props) => {
  const { columns, data, textOverflow, height, scroll, onLineClick, noDataMessage } = props;

  const _sizes = columns.map((column) => column.width || "1fr").join(" ");

  const _scrollX = scroll?.x ? "OTableGrid__Body--ScrollX" : "";
  const _scrollY = scroll?.y ? "OTableGrid__Body--ScrollY" : "";

  const _renderItem = (item: any, _index: number) => {
    return (
      <div
      key={`columns-${_index}`}
        className={`OTableGrid__Columns ${onLineClick ? "OTableGrid__Columns--click" : ""}`}
        style={{ gridTemplateColumns: _sizes }}
        onClick={() => onLineClick && onLineClick(item)}
      >
        {columns.map((column, key) => (
          <div
            key={`content-${key}`}
            className={`OTableGrid__Content ${column.name || ""} ${
              textOverflow ? "OTableGrid__Content--textOverflow" : ""
            }`}
          >
            {column.render ? column.render(item[column.id], item) : item[column.id].toString()}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="OTableGrid">
      <div
        className={`OTableGrid__Header ${scroll?.y ? "OTableGrid__Header--ScrollY" : ""}`}
        style={{ gridTemplateColumns: _sizes }}
      >
        {columns.map((column, key) => (
          <div key={`Header-${key}`} className={`OTableGrid__HeaderColumns ${column.name || ""}`}>
            {column.label}
          </div>
        ))}
      </div>
      <div className={`OTableGrid__Body ${_scrollX} ${_scrollY}`} style={{ height: height || "auto" }}>
        {data.length ? (
          data.map((item, index) => _renderItem(item, index))
        ) : (
          <div className="OTableGrid__noDataMessage">{noDataMessage || "Sem dados"}</div>
        )}
      </div>
    </div>
  );
};

export default OTableGrid;
