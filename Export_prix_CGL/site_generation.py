#! /usr/bin/env python3
from site_class import Site


def get_all_site():

    sites = []
    """
    sites.append(Site("selenium",('https://www.electromenager-compare.com/recherche-',".htm"),
                        "ElectroMenagerCompare",
                        {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "Accept-Encoding" : "gzip, deflate, br",
                        "Accept-Language" : "fr-FR,fr;q=0.9",
                        },
                        {
                        "Cookie" : 'ibt2=0; device=1; cooktest=1; cookopt=0; cookgads=0; cookgana=0; cookdcana=0; cookdccpa=0'
                        },
                        'div',
                        "row aligned-row product-head",
                        'div',
                        'col-xs-12 main-title',
                        'div',
                        'redirect-to link-dark tip tip-not-mobile tip-ajax',
                        "%3b"))
    """
    sites.append(Site("selenium",('https://www.belong.fr/recherche?controller=search&s=',""),
                        "Belong",
                        {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "Accept-Encoding" : "gzip, deflate, br",
                        "Accept-Language" : "fr-FR,fr;q=0.9",
                        },
                        {
                        "Cookie" : 'PrestaShop-89b095bf49fa4bbcf0001b502ac90543=def502002329453783c1e8979a92d98c793fa9beb05293463fb3739034643a01e165338a9769f16221693981aabfb357c0e01f3279da7ae955945aaed3589925bb37625b15e34e4cec5e12b5516b475f32db89c407ebcb120beb291adfc8994220fbd6dd36be86888d29a62b88d175447c30b25133399799d72c2a62443a83b9d336dcf63c80ec632d7966412f239256c4990dfbceca0c903aaf178dbf7d18327c046cbc9a139fb19ea0e9e4df402c5febe07c0ffe8070cfaf439f88efb4c8999d2642398788cda431a3d0c761f0f0; PrestaShop-c265fd0711d59b3405d1e99214458b21=def502008f4c9e8fa9b45241ed368b6eda4115743f3dcf79992e74b309d22401c08d7fc89a7a6ae47db7e01dc3d2ecbb0d8d9fb705e11187bff5ad29371d4755dfa9f648e406eae3e3d55dd3de3dd4121c37cfcffaf9f74dd2958cfd8838ab6220c60a16e101c17e2b2847fab14a282de0dee50d7a6a99397a083438db12661945017e1df79eef072ec881e71454c00a2eb7d18341578b9e22e2c8b13a842acb87dd76; PHPSESSID=lgmtcdt9v0hu96ral5s6b0oqbl; spm_no_receive_push=1'
                        },
                        'article',
                        "product-miniature js-product-miniature",
                        'h2',
                        'h3.product-title',
                        'span',
                        'price',
                        "%2F"))
    return sites
    """

    sites.append(Site("type de lib a utiliser (javascript ou html)",("lien de recherche","fin du lien"),
                        "Nom du site",
                        {
                        "valeur d'un header genre user-agent": "valeur du user agent"
                        },
                        {
                        "le Cookies" : "valeur du dit cookies"
                        },
                        'le type du grand carré qui comprend tous ce qui concerne l'article (de type div / img /p etc)',
                        exemple de data dicriminante,(c'est souvent ca a coter) {'data-index': "0"},
                        'type du titre(h2, p, h1 etc)',
                        'class du titre',
                        'type du prix',
                        'class du prix'))

    """


