import fileinput
import os

replacements = {'&#039;':'\'', '&quot;': '\\\"', '\\&': '&'}

def fix_anime():

    for filename in os.listdir('jikan_anime'):
        read_file = 'jikan_anime/' + filename
        lines = []
        with open(read_file) as infile:
            for line in infile:
                for src, target in replacements.iteritems():
                    line = line.replace(src, target)
                lines.append(line)
        with open(read_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)

def fix_manga():
    for filename in os.listdir('jikan_manga'):
        read_file = 'jikan_manga/' + filename
        lines = []
        with open(read_file) as infile:
            for line in infile:
                for src, target in replacements.iteritems():
                    line = line.replace(src, target)
                lines.append(line)
        with open(read_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)

def fix_character():
    for filename in os.listdir('jikan_character'):
        read_file = 'jikan_character/' + filename
        lines = []
        with open(read_file) as infile:
            for line in infile:
                for src, target in replacements.iteritems():
                    line = line.replace(src, target)
                lines.append(line)
        with open(read_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)

def fix_person():
    for filename in os.listdir('jikan_person'):
        read_file = 'jikan_person/' + filename
        lines = []
        with open(read_file) as infile:
            for line in infile:
                for src, target in replacements.iteritems():
                    line = line.replace(src, target)
                lines.append(line)
        with open(read_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)

if __name__ == "__main__":
    # fix_anime()
    # fix_manga()
    # fix_character()
    # fix_person()