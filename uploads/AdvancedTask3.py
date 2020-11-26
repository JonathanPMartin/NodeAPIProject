import newspaper

from newspaper import Article
import concurrent.futures
URLs = ['http://www.foxnews.com/',
            'http://www.cnn.com/',
            'http://www.tagesschau.de/',
            'http://www.bbc.co.uk/',
            'https://theguardian.com',]
def Get_HeadLines2(url):
    result = newspaper.build(url, memoize_articles=False)
    print('\n''The headlines from %s are' % url, '\n')
    for i in range(1,6):
        art = result.articles[i]
        art.download()
        art.parse()
        print(art.title)

with concurrent.futures.ThreadPoolExecutor(max_workers=7) as executor:
    HeadLines = {executor.submit(Get_HeadLines2, url): url for url in URLs} #runs getheadlines2 coucurently each time
    for page in concurrent.futures.as_completed(HeadLines):
        url = HeadLines[page]
