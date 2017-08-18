<os-info>
  <table class="table table-bordered">
    <tr>
      <th colspan="2"><center><i class="fa fa-hdd-o" /> Hardware Information</center></th>
    </tr>
    <tr>
      <td>Platform:</td>
      <td><i class="fa fa-{ os }" /> [{ platform }] { distro } { arch } / { kernel }</td>
    </tr>
    <tr>
      <td>CPU:</td>
      <td><i class="icon-cpu-processor" /> { cpu }</td>
    </tr>
    <tr>
      <td>Memory:</td>
      <td><i class="icon-ram" /> { memory } GB RAM</td>
    </tr>
  </table>

  <script>
    this.platform = opts.platform;
    this.distro = opts.distro;
    this.kernel = opts.kernel;
    this.arch = opts.arch;
    this.cpu = opts.cpu;
    this.memory = opts.memory;
    
    this.os = ((os) => {
      switch (this.platform){
        case 'Linux':
          return "linux";
          break;
        case 'Darwin':
          return "apple";
          break;
        case 'Windows':
          return "windows";
          break;
      }
    })(this.platform);
  </script>

  <style>
    :scope {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  </style>
</os-info>
