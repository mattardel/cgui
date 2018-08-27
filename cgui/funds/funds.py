import urllib.request
import json
import time
import os


class Funds:
    """ A class containing API information on the 50 funds selected as options for the portfolio optimizer. """

    closings_dict = {}
    funds_dict = {
        'AMCPX': 'AMCAP Fund',
        'AMRMX': 'American Mutual Fund® Class A',
        'INPAX': 'Conservative Growth and Income Portfolio',
        'BFCAX': 'Corporate Bond Fund',
        'DWGAX': 'Developing World Growth and Income Fund',
        'EBNAX': 'Emerging Markets Bond Fund ',
        'GBLAX': 'Global Balanced Fund Class A',
        'PGGAX': 'Global Growth Portfolio',
        'GWPAX': 'Growth Portfolio',
        'GAIOX': 'Growth and Income Portfolio',
        'BLPAX': 'Moderate Growth and Income Portfolio',
        'MFAAX': 'Mortgage Fund',
        'ANBAX': 'Strategic Bond Fund',
        # 'AFAXX': 'U.S. Government Money Market Fund',  # ISSUES HERE, removed for testing
        'AANTX': '2060 Target Date Retirement Fund',
        'AEPGX': 'EuroPacific Growth Fund',
        'ANEFX': 'The New Economy Fund',
        'ANWPX': 'New Perspective Fund',
        'AGTHX': 'The Growth Fund of America',
        'SMCWX': 'SMALLCAP World Fund',
        'NEWFX': 'New World Fund',
        'CWGIX': 'Capital World Growth and Income Fund',
        'ANCFX': 'Fundamental Investors',
        'AIVSX': 'The Investment Company of America',
        'AWSHX': 'Washington Mutual Investors Fund',
        'CAIBX': 'Capital Income Builder',
        'AMECX': 'The Income Fund of America',
        'ABALX': 'American Balanced Fund',
        'AHITX': 'American High Income Trust',
        'BFIAX': 'American Funds Inflation Linked Bond Fund',
        'ASBAX': 'Short-Term Bond Fund of America',
        'AIBAX': 'Intermediate Bond Fund of America',
        'AMUSX': 'U.S. Government Securities Fund',
        'ABNDX': 'The Bond Fund of America',
        'CWBFX': 'Capital World Bond Fund',
        'AMHIX': 'American High-Income Municipal Bond Fund',
        'ASTEX': 'American Funds Short-Term Tax-Exempt Bond Fund',
        'AFTEX': 'American Funds Tax-Exempt Fund of America',
        'LTEBX': 'Limited Term Tax-Exempt Bond Fund of America',
        'TAFTX': 'The Tax-Exempt Fund of California',
        'TRBCX': 'T. Rowe Price Blue Chip Growth Fund',
        'VPMCX': 'Vanguard PrimeCap Fund',
        'FBGRX': 'Fidelity Blue Chip Growth Fund',
        'TLIIX': 'TIAA-CREF Enhanced Lg Cp Gr Idx',
        'POGRX': 'PrimeCap Odyssey Growth Fund',
        'VPCCX': 'Vanguard PrimeCap Core Fund',
        'FKDNX': 'Franklin DynaTech Fund',
        'GLCGX': 'Goldman Sachs Large Cap Gr Insghts Fd',
        'BIAFX': 'Brown Advisory Flexible Equity Fund',
        'HACAX': 'Harbor Capital Appreciation Fund'
    }

    def __init__(self):
        self.compile_closings_dict()

    def get_av_data(self):
        """
            Cycles through the funds_dict dictionary of fund tickers,
            collects the API JSON responses at 1 minute intervals,
            places those responses into key-named text files in /funds/.
        """
        av_key = "X61RJDJCU557MHDV"
        time_function = "TIME_SERIES_DAILY"  # time period for desired info.

        starttime = time.time()
        for key, value in self.funds_dict.items():
            av_url = urllib.request.urlopen(
                "https://www.alphavantage.co/query?" +
                "function=" + time_function + "&" +
                "symbol=" + key + "&" +
                "apikey=" + av_key
            )
            av_response = av_url.read()
            encoding = av_url.info().get_content_charset('utf-8')
            av_json = json.loads(av_response.decode(encoding))

            # store fund json dict in file with same key-name
            print(key)
            with open(os.getcwd() + "/cgui/funds/" + key + ".txt", "w") as outfile:
                json.dump(av_json, outfile)

            # sleep or 15 seconds before retrieving next fund data
            time.sleep(15 - ((time.time() - starttime) % 15))

    def get_closings(self, key, var):
        """
            Recursively collects all closing prices of funds from their
            json txt file.  Returns a list of those closings
        """
        if hasattr(var, 'items'):
            for k, v in var.items():
                if k == key:
                    yield float(v)
                if isinstance(v, dict):
                    for result in self.get_closings(key, v):
                        yield result
                elif isinstance(v, list):
                    for d in v:
                        for result in self.get_closings(key, d):
                            yield result

    def compile_closings_dict(self):
        """
            modifies closing_dict to contain the closings for each
            fund ticker
        """
        for ticker in self.funds_dict:
            file_data = open(os.getcwd() + "/funds/" + ticker + ".txt", "r")
            ticker_json = json.loads(file_data.read())
            self.closings_dict[ticker] = list(self.get_closings("4. close", ticker_json))

