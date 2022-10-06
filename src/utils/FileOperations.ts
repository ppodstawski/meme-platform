/**
 * Basic utilities for file operations
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import * as fs from 'fs';

class FileOperations {
  public static delete = (filePath) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        throw error;
      }
    });
  };
}

export default FileOperations;
