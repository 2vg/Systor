<os-info>
  <h1>System Information</h1>
  <hr />
  <table>
    <tr>
      <th>Platform:</th>
      <td>{ platform }</td>
    </tr>
    <tr>
      <th>Distro:</th>
      <td>{ distro }</td>
    </tr>
    <tr>
      <th>Release:</th>
      <td>{ release }</td>
    </tr>
    <tr>
      <th>Kernel:</th>
      <td>{ kernel }</td>
    </tr>
    <tr>
      <th>Arch:</th>
      <td>{ arch }</td>
    </tr>
    <tr>
      <th>Hostname:</th>
      <td>{ hostname }</td>
    </tr>
  </table>

  <script>
    this.platform = opts.platform;
    this.distro = opts.distro;
    this.release = opts.release;
    this.kernel = opts.kernel;
    this.arch = opts.arch;
    this.hostname = opts.hostname;
  </script>

  <style>
    :scope {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  </style>
</os-info>
