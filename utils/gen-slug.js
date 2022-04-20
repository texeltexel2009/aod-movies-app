import slugify from 'slugify'

const slugWithId = ( title, id ) => {
  return `${slugify( title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  } )}-${id}`;
};
export default slugWithId;
