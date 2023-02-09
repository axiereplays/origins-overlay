export function getClassColor(axieClassName: string) {
  let color = '#000000';
  switch (axieClassName.toLowerCase()) {
    case 'beast':
      color = '#fdb014';
      break;
    case 'bug':
      color = '#ff433e';
      break;
    case 'bird':
      color = '#fa59a0';
      break;
    case 'plant':
      color = '#afdb1b';
      break;
    case 'aquatic':
      color = '#00f5f8';
      break;
    case 'reptile':
      color = '#9967fb';
      break;
    case 'dusk':
      color = '#29fae';
      break;
    case 'dawn':
      color = '#7183e3';
      break;
    case 'mech':
      color = '#71898e';
      break;
    default:
      color = '#ffffff';
      break;
  }

  return color;
}
