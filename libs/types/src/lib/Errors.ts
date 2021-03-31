export function DuplicateChipError(message?: string) {
  this.message = message;
  this.stack = new Error().stack;
}
DuplicateChipError.prototype = Object.create(Error.prototype);
DuplicateChipError.prototype.name = 'DuplicateChipError';
DuplicateChipError.prototype.constructor = DuplicateChipError;
