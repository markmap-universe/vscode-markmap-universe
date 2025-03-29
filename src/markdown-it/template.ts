export const markmapWrapper = (
  id: string,
  root: string,
  jsonOptions: string,
  height?: string,
  toolbar?: boolean
) =>
    /* html */`
    <div class="markmap-wrap" 
      id="${id}" ${height ? `style="height: ${height}"` : ''}
      data-toolbar="${toolbar ?? true}"
    >
      <script type="application/json">${root}</script>
      <script type="application/json">${jsonOptions}</script>
    </div>
    `
