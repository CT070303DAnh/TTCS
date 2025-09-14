import sys, os
print('CWD=', os.getcwd())
try:
    import numpy
    print('NUMPY_FILE=', getattr(numpy, '__file__', None))
except Exception as e:
    print('NUMPY_IMPORT_ERROR=', repr(e))
print('SYS_PATH_0=', sys.path[0])
