<os-info>
  <table class="table table-bordered">
    <tr>
      <th colspan="2"><center><i class="fa fa-server" /> Server Information</center></th>
    </tr>
    <tr>
      <td><i class="fa fa-{ os }" /> [{ platform }] { distro } { arch } / { kernel }</td>
    </tr>
    <tr>
      <td><i class="icon-cpu-processor" /> { cpu }</td>
    </tr>
    <tr>
      <td><i class="icon-ram" /> { memory } GB RAM</td>
    </tr>
    <tr>
      <td><i class="icon-hddalt" /> { dname } - { dused } / { dsize } GB [{ duse }% use]</td>
    </tr>
  </table>

  <script>
    this.platform = opts.platform;
    this.distro = opts.distro;
    this.kernel = opts.kernel;
    this.arch = opts.arch;
    this.cpu = opts.cpu;
    this.memory = opts.memory;
    this.dname = opts.dname;
    this.dsize = opts.dsize;
    this.duse = opts.duse;
    this.dused = opts.dused;
    
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